# Cài đặt

# Cài đặt Zalo User Nodes

## Giới thiệu về Community Nodes

Community Nodes là các nodes được phát triển bởi cộng đồng n8n. Zalo Nodes là một trong những community nodes này, cho phép bạn tích hợp và tự động hóa các tác vụ với Zalo.

### Lưu ý quan trọng

- Zalo User Nodes chỉ khả dụng trên các phiên bản n8n tự host
- Không có sẵn trên n8n cloud
- Yêu cầu bạn phải tự host n8n
- Phiên bản mới nhất hiện tại: 0.5.8

## Cài đặt qua GUI

### Yêu cầu
- n8n phiên bản 0.200.0 trở lên
- Quyền quản trị trên n8n

### Các bước cài đặt

1. Mở n8n và đăng nhập vào tài khoản của bạn
2. Điều hướng đến phần "Settings" (Cài đặt)
3. Chọn "Community Nodes" (Nodes cộng đồng)
4. Nhập tên package: `n8n-nodes-zalo-tools`
5. Click "Install" (Cài đặt)
6. Chờ quá trình cài đặt hoàn tất
7. Khởi động lại n8n để áp dụng các thay đổi

## Cài đặt thủ công

### Yêu cầu
- Node.js phiên bản 18 trở lên
- npm hoặc yarn
- Quyền truy cập vào thư mục cài đặt n8n

### Các bước cài đặt

1. Truy cập vào thư mục cài đặt n8n của bạn
2. Chạy lệnh sau để cài đặt Zalo Nodes:

```bash
npm install n8n-nodes-zalo-tools
```

3. Khởi động lại n8n để áp dụng các thay đổi

## Xác minh cài đặt

Sau khi cài đặt thành công, bạn có thể xác minh bằng cách:

1. Mở n8n
2. Tạo một workflow mới
3. Tìm kiếm "Zalo" trong danh sách nodes
4. Bạn sẽ thấy các nodes sau:
- Zalo Login Via QR Code
- Zalo Message Trigger
- Zalo Send Message 
- Zalo Group
- Zalo User

## Xử lý sự cố

### Kiểm tra phiên bản

1. Kiểm tra phiên bản n8n:
```bash
n8n -v
```

2. Kiểm tra phiên bản Node.js:
```bash
node -v
```

3. Kiểm tra phiên bản npm:
```bash
npm -v
```

### Xóa cache npm

Nếu gặp vấn đề với cache, hãy thử:

```bash
npm cache clean --force
```

### Khởi động lại Docker

Nếu bạn đang chạy n8n trong Docker:

```bash
docker-compose restart
```

### Cài đặt lại

Nếu vẫn gặp vấn đề, hãy thử cài đặt lại:

```bash
npm uninstall n8n-nodes-zalo-tools
npm install n8n-nodes-zalo-tools
```


