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