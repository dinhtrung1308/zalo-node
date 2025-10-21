import { INodeProperties } from 'n8n-workflow';

// Định nghĩa các operations cho Zalo Group
export const zaloGroupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
			},
		},
		options: [
			{
				name: 'Tạo Nhóm',
				value: 'createGroup',
				description: 'Tạo một nhóm mới',
				action: 'Tạo Nhóm',
			},
			{
				name: 'Lấy Thông Tin Nhóm',
				value: 'getGroupInfo',
				description: 'Lấy thông tin của một nhóm',
				action: 'Lấy Thông Tin Nhóm',
			},
			{
				name: 'Thêm Phó Nhóm',
				value: 'addGroupDeputy',
				description: 'Thêm phó nhóm cho một nhóm',
				action: 'Thêm Phó Nhóm',
			},
			{
				name: 'Thêm Thành Viên Vào Nhóm',
				value: 'addUserToGroup',
				description: 'Thêm thành viên vào nhóm',
				action: 'Thêm Thành Viên Vào Nhóm',
			},
			{
				name: 'Đổi Avatar Nhóm',
				value: 'changeGroupAvatar',
				description: 'Đổi avatar của nhóm',
				action: 'Đổi Avatar Nhóm',
			},
			{
				name: 'Đổi Tên Nhóm',
				value: 'changeGroupName',
				description: 'Đổi tên của nhóm',
				action: 'Đổi Tên Nhóm',
			},
			{
				name: 'Lấy Danh Sách Thành Viên',
				value: 'getGroupMembers',
				description: 'Lấy danh sách thành viên của nhóm',
				action: 'Lấy Danh Sách Thành Viên',
			},
			{
				name: 'Lấy Tất Cả Nhóm',
				value: 'getAllGroups',
				description: 'Lấy danh sách tất cả các nhóm',
				action: 'Lấy Tất Cả Nhóm',
			},
			{
				name: 'Xóa Thành Viên Khỏi Nhóm',
				value: 'removeUserFromGroup',
				description: 'Xóa thành ra viên khỏi nhóm',
				action: 'Xóa Thành Viên Khỏi Nhóm',
			},
			{
				name: 'Tạo Ghi Chú',
				value: 'createNote',
				description: 'Tạo ghi chú trong nhóm',
				action: 'Tạo Ghi Chú',
			},
		],
		default: 'createGroup',
	},
];

// Các trường cho từng operation
export const zaloGroupFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:createGroup                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Tên Nhóm',
		name: 'groupName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createGroup'],
			},
		},
		description: 'Tên của nhóm mới',
	},
	{
		displayName: 'Danh Sách ID Thành Viên (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createGroup'],
			},
		},
		description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:getGroupInfo                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getGroupInfo'],
			},
		},
		description: 'ID của nhóm cần lấy thông tin',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:addGroupDeputy                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addGroupDeputy'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'ID Người Dùng',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addGroupDeputy'],
			},
		},
		description: 'ID của người dùng cần thêm làm phó nhóm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:addUserToGroup                         */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addUserToGroup'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Danh Sách ID Thành Viên (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['addUserToGroup'],
			},
		},
		description: 'Danh sách ID thành viên, phân cách bằng dấu phẩy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:changeGroupAvatar                      */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupAvatar'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'URL Ảnh',
		name: 'imageUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupAvatar'],
			},
		},
		description: 'URL của ảnh đại diện mới',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:changeGroupName                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupName'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Tên Mới',
		name: 'newName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['changeGroupName'],
			},
		},
		description: 'Tên mới của nhóm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:getGroupMembers                        */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getGroupMembers'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Giới Hạn',
		name: 'limit',
		type: 'number',
		default: 50,
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getGroupMembers'],
			},
		},
		description: 'Số lượng thành viên tối đa cần lấy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:getAllGroups                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Giới Hạn',
		name: 'limit',
		type: 'number',
		default: 50,
		required: true,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['getAllGroups'],
			},
		},
		description: 'Số lượng nhóm tối đa cần lấy',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:removeUserFromGroup                    */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['removeUserFromGroup'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'ID Người Dùng (nếu nhiều người dùng vui lòng phân cách bằng dấu phẩy)',
		name: 'userIds',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['removeUserFromGroup'],
			},
		},
		description: 'ID của người dùng cần xóa khỏi nhóm',
	},

	/* -------------------------------------------------------------------------- */
	/*                            zaloGroup:createNote                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'ID Nhóm',
		name: 'groupId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createNote'],
			},
		},
		description: 'ID của nhóm',
	},
	{
		displayName: 'Nội Dung Ghi Chú',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createNote'],
			},
		},
		description: 'Nội dung của ghi chú',
	},
	{
		displayName: 'Pin Ghi Chú',
		name: 'pinAct',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['zaloGroup'],
				operation: ['createNote'],
			},
		},
		description: 'Ghim ghi chú lên đầu nhóm',
	},
]; 