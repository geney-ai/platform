provider "digitalocean" {
  token = var.do_token
}

variable "do_token" {
  type        = string
  description = "DigitalOcean API token"
  sensitive   = true
}

variable "registry_name" {
  type        = string
  description = "Name of the container registry"
  default     = "my-registry"
}

variable "region" {
  type        = string
  description = "DigitalOcean region for the registry"
  default     = "nyc3"
}

# TODO (service-deploy): add your new services to this list in order to ensure
#  its repository is created. This must match the service name in turborepo
locals {
  services = ["example"]
}

module "registry" {
  source = "../../modules/digitalocean/registry"

  registry_name        = var.registry_name
  region              = var.region
  repository_names    = local.services
  subscription_tier_slug = "basic"
}
