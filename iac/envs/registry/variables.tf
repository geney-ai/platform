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

variable "registry_name" {
  description = "Name of the container registry"
  type        = string
  default     = "my-registry"
}

variable "region" {
  description = "DigitalOcean region for the registry"
  type        = string
  default     = "nyc3"
}
