import { INodeProperties } from 'n8n-workflow';

export const zaloUserOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
			},
		},
		options: [
			{
				name: 'Chấp nhận lời mời kết bạn',
				value: 'acceptFriendRequest',
				action: 'Chấp nhận lời mời kết bạn',
			},
			{
				name: 'Gửi lời mời kết bạn',
				value: 'sendFriendRequest',
				description: 'Gửi lời mời kết bạn',
				action: 'Gửi lời mời kết bạn',
			},
			{
				name: 'Chặn người dùng',
				value: 'blockUser',
				description: 'Chặn người dùng',
				action: 'Chặn người dùng',
			},
			{
				name: 'Bỏ chặn người dùng',
				value: 'unblockUser',
				description: 'Bỏ chặn người dùng',
				action: 'Bỏ chặn người dùng',
			},
			// {
			// 	name: 'Đổi ảnh đại diện',
			// 	value: 'changeAccountAvatar',
			// 	description: 'Đổi ảnh đại diện',
			// 	action: 'Đổi ảnh đại diện',
			// },
			{
				name: 'Thay đổi cài đặt tài khoản',
				value: 'changeAccountSetting',
				description: 'Thay đổi cài đặt tài khoản',
				action: 'Thay đổi cài đặt tài khoản',
			},
			{
				name: 'Lấy thông tin người dùng',
				value: 'getUserInfo',
				description: 'Lấy thông tin người dùng',
				action: 'Lấy thông tin người dùng',
			},
			{
				name: 'Lấy danh sách bạn bè',
				value: 'getAllFriends',
				description: 'Lấy danh sách bạn bè',
				action: 'Lấy danh sách bạn bè',
			},
			{
				name: 'Tìm kiếm người dùng',
				value: 'findUser',
				description: 'Tìm kiếm người dùng',
				action: 'Tìm kiếm người dùng',
			},
			{
				name: 'Đổi tên gợi nhớ',
				value: 'changeAliasName',
				description: 'Đổi tên gợi nhớ của bạn bè',
				action: 'Đổi tên gợi nhớ',
			},
			{
				name: 'Thu hồi tin nhắn',
				value: 'undoMessage',
				description: 'Thu hồi tin nhắn',
				action: 'Thu hồi tin nhắn',
			},
		],
		default: 'getUserInfo',
	},
];

export const zaloUserFields: INodeProperties[] = [
	//Undo Message
	{
		displayName: 'Thread ID',
		name: 'threadId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'ID của người dùng cần thu hồi tin nhắn',
	},
	{
		displayName: 'Thread Type',
		name: 'threadType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Loại user',
	},
	{
		displayName: 'msgId',
		name: 'msgId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Message ID',
	},
	{
		displayName: 'cliMsgId',
		name: 'cliMsgId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['undoMessage'],
			},
		},
		default: '',
		description: 'Client message ID',
	},
		// Change alias name
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAliasName'],
			},
		},
		default: '',
		description: 'ID của người dùng cần đổi tên gợi nhớ',
	},
	{
		displayName: 'Alias Name',
		name: 'aliasName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAliasName'],
			},
		},
		default: '',
		description: 'Tên gợi nhớ mới',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['acceptFriendRequest'],
			},
		},
		default: '',
		description: 'ID của người dùng cần chấp nhận lời mời kết bạn',
	},

	// Send Friend Request
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['sendFriendRequest'],
			},
		},
		default: '',
		description: 'ID của người dùng cần gửi lời mời kết bạn',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['sendFriendRequest'],
			},
		},
		default: '',
		description: 'Tin nhắn kèm theo lời mời kết bạn',
	},

	// Block User
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['blockUser'],
			},
		},
		default: '',
		description: 'ID của người dùng cần chặn',
	},

	// Unblock User
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['unblockUser'],
			},
		},
		default: '',
		description: 'ID của người dùng cần bỏ chặn',
	},

	// // Change Account Avatar
	// {
	// 	displayName: 'User ID',
	// 	name: 'userId',
	// 	type: 'string',
	// 	required: true,
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloUser'],
	// 			operation: ['changeAccountAvatar'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'ID của người dùng cần đổi ảnh đại diện',
	// },
	// {
	// 	displayName: 'File Path',
	// 	name: 'filePath',
	// 	type: 'string',
	// 	required: true,
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['zaloUser'],
	// 			operation: ['changeAccountAvatar'],
	// 		},
	// 	},
	// 	default: '',
	// 	description: 'Đường dẫn đến file ảnh đại diện',
	// },

	// Change Account Setting
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Tên hiển thị',
	},
	{
		displayName: 'Date of Birth',
		name: 'dob',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Ngày sinh (YYYY-MM-DD)',
	},
	{
		displayName: 'Gender',
		name: 'gender',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		options: [
			{
				name: 'Male',
				value: 1,
			},
			{
				name: 'Female',
				value: 2,
			},
			{
				name: 'Other',
				value: 3,
			},
		],
		default: 1,
		description: 'Giới tính',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['changeAccountSetting'],
			},
		},
		default: '',
		description: 'Ngôn ngữ (vi, en)',
	},

	// Get User Info
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getUserInfo'],
			},
		},
		default: '',
		description: 'ID của người dùng cần lấy thông tin',
	},

	// Get All Friends
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['getAllFriends'],
			},
		},
		default: 50,
		description: 'Số lượng bạn bè tối đa cần lấy',
	},

	// Find User
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUser'],
			},
		},
		default: '',
		description: 'Số điện thoại cần tìm kiếm',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloUser'],
				operation: ['findUser'],
			},
		},
		default: 50,
		description: 'Số lượng kết quả tối đa',
	},
];
