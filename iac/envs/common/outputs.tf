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

# Cloudflare outputs
output "cloudflare_zone_id" {
  description = "The Cloudflare Zone ID"
  value       = module.cloudflare_dns.zone_id
}

output "cloudflare_dns_records" {
  description = "All Cloudflare DNS records created"
  value = {
    root = {
      id       = module.cloudflare_dns.subdomain_records["ts.${local.project_name}"].id
      hostname = module.cloudflare_dns.subdomain_records["ts.${local.project_name}"].hostname
    }
    py = {
      id       = module.cloudflare_dns.subdomain_records["py.${local.project_name}"].id
      hostname = module.cloudflare_dns.subdomain_records["py.${local.project_name}"].hostname
    }
    project = {
      id       = module.cloudflare_dns.subdomain_records["${local.project_name}"].id
      hostname = module.cloudflare_dns.subdomain_records["${local.project_name}"].hostname
    }
    subdomains = module.cloudflare_dns.subdomain_records
  }
}