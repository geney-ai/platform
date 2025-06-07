# Create multiple registries based on configuration
resource "digitalocean_container_registry" "registry" {
  for_each = var.registries

  name                   = each.key
  subscription_tier_slug = each.value.subscription_tier
  region                 = each.value.region
}

resource "digitalocean_container_registry_docker_credentials" "registry_credentials" {
  for_each = var.registries

  registry_name = digitalocean_container_registry.registry[each.key].name
  write         = true
}

# Create repositories for each registry
resource "digitalocean_container_registry_repository" "repositories" {
  for_each = { for idx, repo in local.all_repositories : "${repo.registry_name}-${repo.repository_name}" => repo }

  registry_name = digitalocean_container_registry.registry[each.value.registry_name].name
  name          = each.value.repository_name
}

# Flatten repositories for all registries
locals {
  all_repositories = flatten([
    for registry_name, registry in var.registries : [
      for repo in registry.repositories : {
        registry_name   = registry_name
        repository_name = repo
      }
    ]
  ])
}