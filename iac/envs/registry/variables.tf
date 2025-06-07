variable "default_lifecycle_policy" {
  description = "Default lifecycle policy to apply to all repositories"
  type        = string
  default     = <<EOF
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep last 10 images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
EOF
}

variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "registries" {
  description = "Map of registries to create with their configurations"
  type = map(object({
    region               = string
    subscription_tier    = string
    repositories         = list(string)
    lifecycle_policy     = optional(string)
  }))
  default = {
    "main-registry" = {
      region            = "nyc3"
      subscription_tier = "basic"
      repositories      = ["api", "web", "worker"]
    }
  }
}