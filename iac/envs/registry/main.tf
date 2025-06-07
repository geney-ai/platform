module "registry" {
  source = "../../modules/digitalocean/registry"

  do_token = var.do_token

  registries = var.registries
}