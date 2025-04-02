variable "registry_name" {
  description = "Name of the container registry"
  type        = string
}

variable "subscription_tier_slug" {
  description = "Subscription tier for the registry (basic, professional, or starter)"
  type        = string
  default     = "basic"
}

variable "region" {
  description = "DigitalOcean region for the registry"
  type        = string
  default     = "nyc3"
}

variable "repository_names" {
  description = "List of repository names to create in the registry"
  type        = list(string)
} 