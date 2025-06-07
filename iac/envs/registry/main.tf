provider "digitalocean" {
  token = var.do_token
}

# Create multiple registries using the module
module "registry" {
  source = "../../modules/digitalocean/registry"

  registries = var.registries
}