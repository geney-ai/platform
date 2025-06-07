variable "registries" {
  description = "Map of registries to create with their configurations"
  type = map(object({
    region               = string
    subscription_tier    = string
    repositories         = list(string)
    lifecycle_policy     = optional(string)
  }))
}

variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}