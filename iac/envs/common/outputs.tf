# Droplet outputs
output "digitalocean_droplet_ip" {
  description = "IP address of the DigitalOcean droplet"
  value       = module.digitalocean_droplet.ipv4_address
}

output "digitalocean_droplet_id" {
  description = "ID of the DigitalOcean droplet"
  value       = module.digitalocean_droplet.id
}

# SSH Key outputs
output "digitalocean_ssh_key_id" {
  description = "ID of the SSH key"
  value       = module.digitalocean_ssh_key.id
}

output "digitalocean_ssh_key_fingerprint" {
  description = "Fingerprint of the SSH key"
  value       = module.digitalocean_ssh_key.fingerprint
}

output "digitalocean_ssh_private_key" {
  description = "The generated private SSH key (sensitive)"
  value       = module.digitalocean_ssh_key.private_key_openssh
  sensitive   = true
}

output "digitalocean_ssh_public_key" {
  description = "The public SSH key"
  value       = module.digitalocean_ssh_key.public_key_openssh
}