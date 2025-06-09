locals {
  # Project-wide constants
  project_name = "generic"
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