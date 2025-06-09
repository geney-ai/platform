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

  # Cloudflare configuration
  cloudflare = {
    root_domain  = "example.com"  # TODO: Replace with your actual domain
    domain_slugs = ["api", "app", "www"]  # TODO: Add your subdomains
    ttl          = 300
    proxied      = false
  }
}
