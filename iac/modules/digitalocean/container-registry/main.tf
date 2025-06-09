# Create multiple registries based on configuration
resource "digitalocean_container_registry" "registry" {
  name                   = var.name
  subscription_tier_slug = var.subscription_tier
  region                 = var.region
}

resource "digitalocean_container_registry_docker_credentials" "registry_credentials" {
  registry_name = digitalocean_container_registry.registry.name
  write         = true
}