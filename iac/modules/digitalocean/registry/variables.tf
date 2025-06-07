variable "registries" {
  description = "Map of registries to create with their configurations"
  type = map(object({
    region               = string
    subscription_tier    = string
    repositories         = list(string)
    lifecycle_policy     = optional(string)
  }))
}