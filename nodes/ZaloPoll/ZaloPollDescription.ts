import { INodeProperties } from 'n8n-workflow';

// Định nghĩa các operations cho Zalo Poll
export const zaloPollOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
			},
		},
		options: [
			{
				name: 'Tạo bình chọn',
				value: 'createPoll',
				description: 'Tạo một bình chọn mới',
				action: 'Tạo bình chọn',
			},
            {
				name: 'Lấy thông tin bình chọn',
				value: 'getPoll',
				description: 'Lấy thông tin bình chọn',
				action: 'Lấy thông tin bình chọn',
			},
			{
				name: 'Khóa bình chọn',
				value: 'lockPoll',
				description: 'Khóa bình chọn',
				action: 'Khóa bình chọn',
			},
		],
		default: 'createPoll',
	},
];

// Các trường cho từng operation
export const zaloPollFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            zaloPoll:createPoll                            */
	/* -------------------------------------------------------------------------- */
	{
        displayName: 'ID Nhóm',
        name: 'groupId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
				resource: ['zaloPoll'],
                operation: ['createPoll'],
            },
        },
        description: 'ID của nhóm để tạo poll (chỉ hoạt động với nhóm)',
    },
    {
		displayName: 'Chủ đề bình chọn',
		name: 'question',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Đặt câu hỏi bình chọn',
	},
	{
		displayName: 'Kiểu nhập lựa chọn',
		name: 'optionInputType',
		type: 'options',
		options: [
			{
			name: 'Danh sách',
			value: 'list',
			description: 'Nhập từng lựa chọn riêng biệt',
			},
			{
			name: 'Văn bản',
			value: 'text',
			description: 'Nhập tất cả lựa chọn trong một ô, phân tách bằng dấu phẩy',
			},
		],
		default: 'list',
		displayOptions: {
			show: {
			resource: ['zaloPoll'],
			operation: ['createPoll'],
			},
		},
	},
	{
		// Danh sách hiện tại (fixedCollection)
		displayName: 'Các lựa chọn',
		name: 'pollOptionsCollection',
		type: 'fixedCollection',
		placeholder: 'Thêm lựa chọn',
		typeOptions: {
			multipleValues: true,
			sortable: true
		},
		default: {
			options: [
			{ option: '' },
			{ option: '' },
			],
		},
		displayOptions: {
			show: {
			resource: ['zaloPoll'],
			operation: ['createPoll'],
			optionInputType: ['list'],
			},
		},
		options: [
			{
			name: 'options',
			displayName: 'Lựa chọn',
			values: [
				{
				displayName: 'Lựa chọn',
				name: 'option',
				type: 'string',
				default: '',
				placeholder: 'Nhập lựa chọn...',
				description: 'Nội dung của lựa chọn',
				required: true,
				},
			],
			},
		],
		description: 'Thêm các lựa chọn cho bình chọn',
	},
	{

		displayName: 'Các lựa chọn',
		name: 'optionsString',
		type: 'string',
		default: 'Lựa chọn 1, Lựa chọn 2, Lựa chọn 3',
		placeholder: 'Nhập các lựa chọn, phân tách bằng dấu phẩy...',
		displayOptions: {
			show: {
			resource: ['zaloPoll'],
			operation: ['createPoll'],
			optionInputType: ['text'],
			},
		},
		description: 'Nhập các lựa chọn, mỗi lựa chọn phân tách bằng dấu phẩy',
	},
    {
		displayName: 'Thời hạn bình chọn',
		name: 'expiredTime',
		type: 'dateTime',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Thời hạn bình chọn (Để trống nếu không có thời hạn)',
	},
    {
		displayName: 'Ghim lên đầu trò chuyện',
		name: 'pinAct',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Tạo ghim lên đầu trò chuyện',
	},
    {
		displayName: 'Chọn nhiều phương án',
		name: 'allowMultiChoices',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Người tham gia có thể bình chọn nhiều phương án khác nhau',
	},
    {
		displayName: 'Có thể thêm phương án',
		name: 'allowAddNewOption',
		type: 'boolean',
		required: true,
		default: true,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Người tham gia có thể thêm phương án mới',
	},
    {
		displayName: 'Ẩn kết quả khi chưa bình chọn',
		name: 'hideVotePreview',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Người tham gia chỉ thấy kết quả sau khi bình chọn',
	},
    {
		displayName: 'Ẩn người bình chọn',
		name: 'isAnonymous',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloPoll'],
				operation: ['createPoll'],
			},
		},
		description: 'Người tham gia không thể thấy người khác bình chọn',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloPoll:getPoll                           */
	/* -------------------------------------------------------------------------- */
	{
        displayName: 'ID bình chọn',
        name: 'poll_id',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
				resource: ['zaloPoll'],
                operation: ['getPoll'],
            },
        },
        description: 'ID của bình chọn',
    },

	/* -------------------------------------------------------------------------- */
	/*                            zaloPoll:lockPoll                        */
	/* -------------------------------------------------------------------------- */
	{
        displayName: 'ID bình chọn',
        name: 'poll_id',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
				resource: ['zaloPoll'],
                operation: ['lockPoll'],
            },
        },
        description: 'ID của bình chọn',
    },
]; 