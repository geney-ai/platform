terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

resource "digitalocean_container_registry" "registry" {
  name                   = var.registry_name
  subscription_tier_slug = var.subscription_tier_slug
  region                 = var.region
}

resource "digitalocean_container_registry_docker_credentials" "registry_credentials" {
  registry_name = digitalocean_container_registry.registry.name
  write         = true
}

# Create repository for each service
resource "digitalocean_container_registry_repository" "repositories" {
  for_each = toset(var.repository_names)

  registry_name = digitalocean_container_registry.registry.name
  name          = each.value
} 