output "registry" {
  description = "Registry with its details"
  value = {
    endpoint = digitalocean_container_registry.registry.endpoint
    name     = digitalocean_container_registry.registry.name
  }
}

output "registry_credentials" {
  description = "Docker credentials for the registry"
  value = digitalocean_container_registry_docker_credentials.registry_credentials.docker_credentials
  sensitive = true
}