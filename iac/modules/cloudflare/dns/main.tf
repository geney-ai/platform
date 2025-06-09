# Data source to look up the zone ID from the domain name
data "cloudflare_zone" "main" {
  zone_id = var.zone_id
}

# A records for each domain slug
resource "cloudflare_record" "subdomains" {
  for_each = toset(var.domain_slugs)

  zone_id = data.cloudflare_zone.main.id
  name    = each.value
  content = var.droplet_ip
  type    = "A"
  ttl     = var.ttl
  proxied = var.proxied
}