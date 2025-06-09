# Production environment outputs - expose common module outputs

# Droplet outputs
output "digitalocean_droplet_ip" {
  description = "IP address of the DigitalOcean droplet"
  value       = module.common.digitalocean_droplet_ip
}

output "digitalocean_droplet_id" {
  description = "ID of the DigitalOcean droplet"
  value       = module.common.digitalocean_droplet_id
}

# SSH Key outputs
output "digitalocean_ssh_key_id" {
  description = "ID of the SSH key"
  value       = module.common.digitalocean_ssh_key_id
}

output "digitalocean_ssh_key_fingerprint" {
  description = "Fingerprint of the SSH key"
  value       = module.common.digitalocean_ssh_key_fingerprint
}

output "digitalocean_ssh_private_key" {
  description = "The generated private SSH key (sensitive)"
  value       = module.common.digitalocean_ssh_private_key
  sensitive   = true
}

output "digitalocean_ssh_public_key" {
  description = "The public SSH key"
  value       = module.common.digitalocean_ssh_public_key
}

# Cloudflare outputs
output "cloudflare_zone_id" {
  description = "The Cloudflare Zone ID"
  value       = module.common.cloudflare_zone_id
}

output "cloudflare_dns_records" {
  description = "All Cloudflare DNS records created"
  value       = module.common.cloudflare_dns_records
}