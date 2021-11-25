using Flunt.Notifications;
using System;

namespace Makemoney.Domain.Shared
{
    public abstract class Entity : Notifiable
    {
        
        public Entity() {
            Id = Guid.NewGuid();
                        

        }

        

        public Guid Id { get; private set; }
    }

    
    }
