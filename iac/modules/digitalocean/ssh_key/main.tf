# Generate SSH key pair if not provided
resource "tls_private_key" "main" {
  algorithm = "ECDSA"
  ecdsa_curve = "P384"
}

# Use generated or provided SSH key
resource "digitalocean_ssh_key" "main" {
  name       = var.name
  public_key = tls_private_key.main.public_key_openssh
}