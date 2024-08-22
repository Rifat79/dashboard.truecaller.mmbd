<?php
// Read the public key
$publicKey = file_get_contents('1001_public.pem');
if (!$publicKey) {
    die('Failed to read the public key file');
}

// Convert the public key to a usable format for openssl
$publicKeyResource = openssl_pkey_get_public($publicKey);
if (!$publicKeyResource) {
    $error = openssl_error_string();
    die('Invalid public key. OpenSSL error: ' . $error);
}

// Encrypt the data
$data = json_encode(['msisdn' => '8801700705294', 'days' => 3, 'trxId' => 'sdfasdfasdffasdf']);
if (openssl_public_encrypt($data, $encryptedData, $publicKeyResource, OPENSSL_PKCS1_OAEP_PADDING)) {
    $encryptedData = base64_encode($encryptedData);
    echo "Encrypted data: $encryptedData\n";
} else {
    die("Failed to encrypt data");
}

// Free the key resource
openssl_free_key($publicKeyResource);

// API endpoint and data
$url = 'http://localhost:8281/api/v2/truecaller-bundle/activate';
$postData = [
    'partnerId' => 1001,
    'data' => $encryptedData
];

// Initialize cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    die('cURL error: ' . curl_error($ch));
}

// Close the cURL resource
curl_close($ch);

// Output the response
echo "API response: $response";
?>
