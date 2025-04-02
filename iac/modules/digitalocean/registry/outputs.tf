output "registry_endpoint" {
  description = "The endpoint URL of the container registry"
  value       = digitalocean_container_registry.registry.endpoint
}

output "registry_name" {
  description = "The name of the container registry"
  value       = digitalocean_container_registry.registry.name
}

output "registry_credentials" {
  description = "The Docker credentials for the registry"
  value       = digitalocean_container_registry_docker_credentials.registry_credentials.docker_credentials
  sensitive   = true
}

output "repositories" {
  description = "The created repositories"
  value       = { for k, v in digitalocean_container_registry_repository.repositories : k => v.name }
} 