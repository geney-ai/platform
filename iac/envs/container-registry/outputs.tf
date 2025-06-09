# Container Registry outputs

output "registry" {
  description = "Registry details"
  value       = module.registry.registry
}

output "registry_credentials" {
  description = "Docker credentials for the registry"
  value       = module.registry.registry_credentials
  sensitive   = true
}