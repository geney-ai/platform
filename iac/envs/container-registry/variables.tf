resource "random_string" "project_prefix" {
  length  = 4
  special = false
}

locals {
  project_name = "generic"
}

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

# TODO (amiller68): Add more repositories here
variable "repositories" {
  description = "List of repositories to create"
  type        = list(string)
  default     = ["generic-ts-web", "generic-py"]
}
