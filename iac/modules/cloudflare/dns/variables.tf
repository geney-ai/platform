variable "zone_id" {
  description = "The ID of the zone"
  type        = string
}

variable "droplet_ip" {
  description = "The IPv4 address of the droplet"
  type        = string
}

variable "domain_slugs" {
  description = "List of domain slugs to create as subdomains"
  type        = list(string)
  default     = []
}

variable "ttl" {
  description = "TTL for DNS records"
  type        = number
  default     = 300
}

variable "proxied" {
  description = "Whether the records should be proxied through Cloudflare"
  type        = bool
  default     = false
}