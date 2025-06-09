# DigitalOcean Infrastructure Module

# random prefix for the project
resource "random_string" "project_prefix" {
  length  = 4
  special = false
}

# Project
module "digitalocean_project" {
  source = "../../modules/digitalocean/project"

  name = "${local.project_name}-${var.environment}-${random_string.project_prefix.result}-project"
  description = "Project for ${local.project_name} ${var.environment}"
  environment = var.environment
  resources = [module.digitalocean_droplet.urn]
}


# SSH key which will get access to the droplet
module "digitalocean_ssh_key" {
  source = "../../modules/digitalocean/ssh_key"

  name = "${local.project_name}-${var.environment}-${random_string.project_prefix.result}-ssh-key"
}

# Droplet
module "digitalocean_droplet" {
  source = "../../modules/digitalocean/droplet"

  name = "${local.project_name}-${var.environment}-${random_string.project_prefix.result}-droplet"

  region = var.digitalocean.droplet.region
  tags   = ["${local.project_name}-${var.environment}"]

  # SSH configuration
  ssh_keys        = [module.digitalocean_ssh_key.id]
}

# Cloudflare DNS
module "cloudflare_dns" {
  source = "../../modules/cloudflare/dns"

  zone_id  = local.cloudflare_zone_id
  droplet_ip   = module.digitalocean_droplet.ipv4_address
  domain_slugs = ["ts.${local.project_name}", "py.${local.project_name}", "${local.project_name}"]
  ttl          = var.cloudflare.ttl
  proxied      = var.cloudflare.proxied
}