terraform { 
  cloud { 
    # TODO (replace with your own organization)
    organization = "krondor-corp" 

    workspaces { 
      # TODO (setup production workspace in your own organization for said project)
      name = "production" 
    } 
  } 
}