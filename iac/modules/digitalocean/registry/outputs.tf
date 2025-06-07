output "registries" {
  description = "Map of registries with their details"
  value = {
    for k, v in digitalocean_container_registry.registry : k => {
      endpoint = v.endpoint
      name     = v.name
    }
  }
}

output "registry_credentials" {
  description = "Map of Docker credentials for each registry"
  value = {
    for k, v in digitalocean_container_registry_docker_credentials.registry_credentials : k => v.docker_credentials
  }
  sensitive = true
}