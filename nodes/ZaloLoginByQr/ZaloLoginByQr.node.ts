import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { Zalo } from 'zca-js';
import * as path from 'path';
import axios from 'axios';

export class ZaloLoginByQr implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Zalo Login Via QR Code',
		name: 'zaloLoginByQr',
		group: ['Zalo'],
		version: 1,
		description: 'LĐăng nhập Zalo bằng QR code và lưu thông tin vào Credentia',
		defaults: {
			name: 'Zalo Login Via QR Code',
		},
		// @ts-ignore
		inputs: ['main'],
		// @ts-ignore
		outputs: ['main'],
		icon: 'file:../shared/zalo.svg',
		credentials: [
			{
				name: 'zaloApi',
				required: false,
				displayName: 'Zalo Credential to connect with',
			},
			{
				name: 'n8nZaloApi',
				required: true,
				displayName: 'n8n Account Credential',
			  },
		],
		properties: [
			{
				displayName: 'Proxy',
				name: 'proxy',
				type: 'string',
				default: '',
				placeholder: 'https://user:pass@host:port',
				description: 'HTTP proxy to use for Zalo API requests',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const proxy = this.getNodeParameter('proxy', 0, '') as string;
		const timeout = 30; // Fixed timeout of 30 seconds
		const fileName = 'zalo-qr-code.png'; // Fixed filename

		// Get the credentials if provided
		let zaloCredential : any;
		let n8nCredential : any;

		// Try to get Zalo API credential
		try {
			zaloCredential = await this.getCredentials('zaloApi');
		} catch (error) {
			// No Zalo credential selected, which is fine
		}

		// Try to get n8n API credential
		try {
			n8nCredential = await this.getCredentials('n8nZaloApi');
		} catch (error) {
			// No n8n credential selected, which is fine
		}

		// Determine which credential to use
		let selectedCredential = undefined;

		// If we have n8n credential, use it
		if (n8nCredential) {
			console.error('Using n8n account credential');
			selectedCredential = n8nCredential;
		} else if (zaloCredential) {
			console.error('Using Zalo API credential');
			selectedCredential = zaloCredential;
		} else {
			console.error('No credentials provided, will generate QR code for login');
		}

		try {
			

			const zaloOptions: any = {
				selfListen: true,
				logging: true,
			};

			if (proxy) {
				zaloOptions.proxy = proxy;
			}

			// Initialize Zalo
			let zalo: any;

			// If we have credentials, use them
			if (selectedCredential) {
				console.error('Using existing Zalo credentials');
				zalo = new Zalo(zaloOptions);

				// Check if we're using n8n credential or Zalo credential
				if (selectedCredential === n8nCredential) {
					// Using n8n credential - we need to get the Zalo credentials from the n8n credential
					console.error('Using n8n credential to get Zalo credentials');

					// Get the credential data from the n8n credential
					const n8nApiKey = selectedCredential.apiKey as string;
					const n8nUrl = selectedCredential.url as string || 'http://localhost:5678';

					console.error(`Using n8n API at ${n8nUrl} with API key ${n8nApiKey ? 'provided' : 'not provided'}`);

					// For now, we'll just log in with QR code since we don't have a way to get Zalo credentials from n8n
					console.error('n8n credential support is not fully implemented yet. Will use QR code login.');

					// Re-initialize Zalo without credentials
					zalo = new Zalo(zaloOptions);
				} else {
					// Using Zalo credential
					console.error('Using Zalo credential for login');

					// Use the credentials to login
					const cookie = selectedCredential.cookie as string;
					const imei = selectedCredential.imei as string;
					const userAgent = selectedCredential.userAgent as string;
					const supportCode = selectedCredential.supportCode as string;
					const licenseKey = selectedCredential.licenseKey as string;

					// Check if we have a proxy in the credential
					if (selectedCredential.proxy) {
						console.error('Using proxy from credential:', selectedCredential.proxy);
						zaloOptions.proxy = selectedCredential.proxy as string;
					}

					// Log in with the credentials
					await zalo.login({
						cookie,
						imei,
						userAgent,
						supportCode,
						licenseKey,
					} as any);
				}
			} else {
				// No credentials, create a new instance
				zalo = new Zalo(zaloOptions);
			}
			console.error('Starting Zalo QR login process...');

			// Function to process context and save credentials
			const processContext = (context: any) => {
				if (!context) {
					console.error('Context is null or undefined');
					return;
				}

				const cookie = context.cookie || '';
				const imei = context.imei || '';
				const userAgent = context.userAgent || '';

				console.error('=== ZALO CREDENTIALS ===');
				console.error('Cookie:', cookie ? `Received (length: ${typeof cookie === 'string' ? cookie.length : (Array.isArray(cookie) ? cookie.length : 'unknown')})` : 'None');
				console.error('IMEI:', imei ? imei : 'None');
				console.error('User Agent:', userAgent ? userAgent : 'None');
				console.error('=== END CREDENTIALS ===');


			};

			// Function to set up event listeners
			const setupEventListeners = (api: any) => {
				console.error('Setting up event listeners to get credentials');

				try {
					// Check if getContext is a function
					if (typeof api.getContext === 'function') {
						// Try to get context
						const contextResult = api.getContext();

						// Check if result is a promise
						if (contextResult && typeof contextResult.then === 'function') {
							// It's a promise, use .then
							contextResult.then((context: any) => {
								processContext(context);
							}).catch((error: any) => {
								console.error('Error getting context:', error);
							});
						} else {
							// It's not a promise, use directly
							processContext(contextResult);
						}
					} else {
						console.error('getContext is not a function');

						// Try to get context from the api object directly
						if (api.context) {
							console.error('Found context in api object');
							processContext(api.context);
						} else {
							console.error('No context found in api object');
						}
					}
				} catch (error) {
					console.error('Error in setupEventListeners:', error);
				}
			};

			// Generate QR code
			const qrCodePromise = new Promise<string>(async (resolve, reject) => {
				let isResolved = false;

				// Set timeout for QR code generation
				const timeoutId = setTimeout(() => {
					if (!isResolved) {
						isResolved = true;
						reject(new NodeOperationError(this.getNode(), 'Timeout generating QR code. Please try again or check your Zalo connection.'));
					}
				}, timeout * 1000); // Convert seconds to milliseconds

				try {
					// @ts-ignore - Ignore type checking for loginQR method
					let api = await zalo.loginQR(null, (qrEvent: any) => {
						console.error('Received QR event type:', qrEvent ? qrEvent.type : 'no event');

						// Handle different event types based on the LoginQRCallbackEventType enum
						switch (qrEvent.type) {
							case 0: // QRCodeGenerated
								if (qrEvent?.data?.image) {
									const qrCodeBase64 = qrEvent.data.image;
									console.error('QR code generated, length:', qrCodeBase64.length);

									// If QR code was already resolved, we don't need to do anything
									if (isResolved) return;

									// Clear timeout
									clearTimeout(timeoutId);

									// If we have a QR code, resolve with it
									if (qrCodeBase64) {
										isResolved = true;
										resolve(qrCodeBase64);
									}
								} else {
									console.error('Could not get QR code from Zalo SDK');
									reject(new Error("Could not get QR code"));
								}
								break;

							case 1: // QRCodeExpired
								console.error('QR code expired. Please try again.');
								break;

							case 2: // QRCodeScanned
								console.error('=== QR CODE SCANNED ===');
								if (qrEvent?.data) {
									console.error('User:', qrEvent.data.display_name);
									console.error('Avatar:', qrEvent.data.avatar ? 'Yes' : 'No');
								}
								break;

							case 3: // QRCodeDeclined
								console.error('=== QR CODE DECLINED ===');
								if (qrEvent?.data?.code) {
									console.error('Decline code:', qrEvent.data.code);
								}
								break;

							case 4: // GotLoginInfo
								console.error('=== GOT LOGIN INFO ===');
								if (qrEvent?.data) {
									const cookie = qrEvent.data.cookie || [];
									const imei = qrEvent.data.imei || '';
									const userAgent = qrEvent.data.userAgent || '';

									console.error('Cookie received:', cookie.length > 0 ? 'Yes' : 'No');
									console.error('IMEI received:', imei ? 'Yes' : 'No');
									console.error('User Agent received:', userAgent ? 'Yes' : 'No');

									// Save credentials to file immediately
									try {
										// Create debug file
										

										// Save credentials to output directory
										if (cookie.length > 0 || imei || userAgent) {
											

											// Create credential info file for auto-creation
											const credentialName = 'Zalo API Credentials';
											const credentialData = {
												cookie: JSON.stringify(cookie),
												imei: imei,
												userAgent: userAgent,
												proxy: proxy || '',
												supportCode: '',
												licenseKey: ''
											};

											

											// Try to automatically create the credential by directly calling the n8n API
											try {
												console.error('Attempting to create Zalo credential via n8n API');

												// Prepare the credential data for n8n API
												const credentialApiData = {
													name: credentialName,
													type: 'zaloApi',
													nodesAccess: [],
													data: credentialData
												};

												// Try different ports that n8n might be running on
												const ports = [5678];

												// Function to create credential on a specific port
												const createCredentialOnPort = async (port: number) => {
													const n8nApi =  await this.getCredentials('n8nZaloApi');
													const n8nApiUrl = n8nApi.url as string;
													const fullApiUrl = `${n8nApiUrl}/api/v1/credentials`;

													const n8nApiKey = n8nApi.apiKey as string;
													console.error(`Trying to create credential via n8n API at ${fullApiUrl}`);

													try {
														await axios.post(fullApiUrl, credentialApiData,
															{
														   headers: {
															 'Content-Type': 'application/json',
															 'X-N8N-API-KEY': n8nApiKey as string
														   },
														 })
														 
														console.error('Credential created successfully via n8n API');
														console.error('Credential ID:');
														  
														return true;
													} catch (apiError: any) {
														console.error(`Error creating credential on port ${port}:`, apiError.message);
														return false;
													}
												};

												// Try each port sequentially
												let credentialCreated = false;

												// Use an async IIFE to handle the async calls
												(async () => {
													// Try each port one by one
													for (const port of ports) {
														try {
															const result = await createCredentialOnPort.call(this, port);
															if (result) {
																credentialCreated = true;
																break;
															}
														} catch (error) {
															console.error(`Error trying port ${port}:`, error.message);
														}
													}


												})().catch(error => {
													console.error('Error in credential creation:', error.message);
												});

												if (!credentialCreated) {
													console.error('Could not create credential via n8n API on any port.');
													console.error('Credential info saved to file. You can create it manually using:');
													console.error('node auto-create-zalo-credential.js');
												}
											} catch (error: any) {
												console.error(`Error creating credential: ${error.message}`);
												console.error('Credential info saved to file. You can create it manually using:');
												console.error('node auto-create-zalo-credential.js');
											}
										} else {
											console.error('=== NO CREDENTIALS TO SAVE ===');
											console.error('No login information available to save');
										}
									} catch (fileError: any) {
										console.error('Error saving credentials:', fileError.message);
									}
								}
								break;

							default:
								console.error('Unknown QR event type:', qrEvent.type);
						}
					});

					// Start the listener immediately to capture all events
					console.error('Starting Zalo listener');
					api.listener.start();

					// Set up event listeners after getting the API
					api.listener.onConnected(() => {
						console.error("=== ZALO SDK CONNECTED ===");
						// Get context after successful connection
						setupEventListeners(api);
					});

					// Listen for errors
					api.listener.onError((error: any) => {
						console.error("=== ZALO ERROR ===", error);
					});

					// Listen for messages (might contain login information)
					api.listener.onMessage((message: any) => {
						console.error("=== ZALO MESSAGE RECEIVED ===");
						console.error("Message type:", message.type);
						console.error("Message content:", JSON.stringify(message).substring(0, 200) + '...');

						// Check if this is a login confirmation message
						if (message.type === 'login_success' || message.type === 'qr_scanned') {
							console.error("=== QR CODE SCANNED OR LOGIN SUCCESSFUL ===");
							setupEventListeners(api);
						}
					});

					console.error('All event listeners set up');
				} catch (error: any) {
					// Clear timeout
					clearTimeout(timeoutId);

					if (!isResolved) {
						isResolved = true;
						reject(error);
					}
				}
			});

			// Wait for QR code to be generated
			const qrCodeBase64 = await qrCodePromise;

			// Create a binary buffer from the base64 string
			const binaryData = Buffer.from(qrCodeBase64, 'base64');

			// Create a new item with the QR code as binary data
			const newItem: INodeExecutionData = {
				json: {
					success: true,
					message: selectedCredential === n8nCredential
						? 'Using n8n account credential. QR code generated successfully.'
						: (selectedCredential === zaloCredential
							? 'Using existing Zalo credentials. QR code generated successfully.'
							: 'QR code generated successfully. Scan with Zalo app to login.'),
					fileName,
					usingExistingCredential: !!selectedCredential,
					credentialType: selectedCredential === n8nCredential ? 'n8nZaloApi' : (selectedCredential === zaloCredential ? 'zaloApi' : null),
				},
				binary: {
					data: await this.helpers.prepareBinaryData(binaryData, fileName, 'image/png'),
				},
			};

			returnData.push(newItem);

			// Add credential creation instructions to the output
			if (returnData[0] && returnData[0].json) {
				if (!selectedCredential) {
					returnData[0].json.credentialInstructions = 'Credentials have been saved to file. Credentials will be created automatically if n8n API credentials are provided.';
					returnData[0].json.credentialFilePath = path.join(process.cwd(), 'output', 'zalo-credentials.json');
					returnData[0].json.autoCreateScript = 'node auto-create-zalo-credential.js';
					returnData[0].json.autoCreateApi = 'Credentials will be created automatically via n8n API if n8n API credentials are provided.';
				} else if (selectedCredential === n8nCredential) {
					returnData[0].json.credentialInstructions = 'Using n8n account credential. New Zalo credentials will be created automatically after successful login.';
					returnData[0].json.credentialName = selectedCredential.name || 'Unknown';
					returnData[0].json.credentialId = selectedCredential.id || 'Unknown';
					returnData[0].json.credentialType = 'n8nZaloApi';
					returnData[0].json.autoCreateApi = 'Credentials will be created automatically via n8n API after successful login.';
				} else {
					returnData[0].json.credentialInstructions = 'Using existing Zalo credentials from the selected credential.';
					returnData[0].json.credentialName = selectedCredential.name || 'Unknown';
					returnData[0].json.credentialId = selectedCredential.id || 'Unknown';
					returnData[0].json.credentialType = 'zaloApi';
				}
			}

			return [returnData];
		} catch (error: any) {
			if (this.continueOnFail()) {
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray({ error: error.message }),
					{ itemData: { item: 0 } },
				);
				return [executionData];
			} else {
				throw error;
			}
		}
	}
}