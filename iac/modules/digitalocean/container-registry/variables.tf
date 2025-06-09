variable "name" {
  description = "Name of the registry"
  type        = string
}

variable "region" {
  description = "Region of the registry"
  type        = string
}

variable "subscription_tier" {
  description = "Subscription tier of the registry"
  type        = string
}

variable "repositories" {
  description = "Repositories of the registry"
  type        = list(string)
}

variable "lifecycle_policy" {
  description = "Lifecycle policy of the registry"
  type        = string
}