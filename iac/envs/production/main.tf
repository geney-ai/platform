# Import common variables
module "common" {
  source = "../common"

  # Only need to specify environment now
  environment = "production"

  # DigitalOcean configuration directly inline
  digitalocean = {
    droplet = {
      region = "nyc3"
    }
  }
}
