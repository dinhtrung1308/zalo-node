import {
    ICredentialType,
    INodeProperties,
    Icon,
  } from 'n8n-workflow';
  
  export class N8nZaloApi implements ICredentialType {
    name = 'n8nZaloApi';
    displayName = 'n8n Zalo Account Credential';
    documentationUrl = 'n8n-n8n-api';
    
    icon: Icon = 'file:shared/n8n.png';

    properties: INodeProperties[] = [
      {
        displayName: 'API Key',
        name: 'apiKey',  
        type: 'string',
        default: '',
        description: 'The API key used to authenticate with the n8n API.',
        required:  true,
      },
      {
        displayName: 'URL',
        name: 'url',
        type: 'string',
        default: 'http://127.0.0.1:5678',
        description: 'The URL of the n8n instance',
        required:  true,
      }
    ];
  }