module "registry" {
  source = "../../modules/digitalocean/container-registry"

    name                 = "${lower(random_string.project_prefix.result)}${local.project_name}registry"
    region               = "nyc3"
    subscription_tier    = "basic"
    repositories         = var.repositories
    lifecycle_policy     = var.default_lifecycle_policy
}