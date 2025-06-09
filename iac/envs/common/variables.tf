locals {
  # Project-wide constants
  project_name = "generic"
  # TODO: make this configurable somehow
  cloudflare_zone_id = "0810426df610d25deabc925b44c87d9b"
}

variable "environment" {
  description = "Environment name (staging, production, etc.)"
  type        = string
  validation {
    # supported environments
    # TODO: support more environments
    condition     = contains(["production"], var.environment)
    error_message = "Environment must be one of: production"
  }
}

# DigitalOcean configuration
variable "digitalocean" {
  description = "Configuration for DigitalOcean infrastructure"
  type = object({
    droplet = object({
      region = string
    })
  })
}

# Cloudflare configuration
variable "cloudflare" {
  description = "Configuration for Cloudflare DNS"
  type = object({
    ttl          = optional(number, 300)
    proxied      = optional(bool, false)
  })
}