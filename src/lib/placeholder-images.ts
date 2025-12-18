
export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Images are in the public folder
const logoUrl = '/pyramid-logo.png';
const logoSquareUrl = '/pyramid-only.png';
const nameplateUrl = '/pyramid-nameplate.png';

export const PlaceHolderImages: ImagePlaceholder[] = [
    {
      "id": "hero-image",
      "description": "A serene landscape providing a sense of peace and tranquility.",
      "imageUrl": "https://images.unsplash.com/photo-1662189793032-ccb6135a9159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzZXJlbmUlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzYzODU5NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "serene landscape"
    },
    {
      "id": "testimonial-1",
      "description": "A family finding comfort and support together.",
      "imageUrl": "https://images.unsplash.com/photo-1587571065775-0d2ae0c863e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxmYW1pbHklMjBjb21mb3J0fGVufDB8fHx8MTc2MzkxMjgxNHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "family comfort"
    },
    {
      "id": "testimonial-2",
      "description": "A support group session in a calm environment.",
      "imageUrl": "https://images.unsplash.com/photo-1573878587306-c6723c815090?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzdXBwb3J0JTIwZ3JvdXB8ZW58MHx8fHwxNzYzOTEwNjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "support group"
    },
    {
      "id": "testimonial-3",
      "description": "A peaceful landscape with soft light.",
      "imageUrl": "https://images.unsplash.com/photo-1583975656839-3c897af58424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwZWFjZWZ1bCUyMGxhbmRzY2FwZXxlbnwwfHx8fDE3NjM4MzYwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "peaceful landscape"
    },
    {
      "id": "grief-support-main",
      "description": "A person being consoled by a supportive friend.",
      "imageUrl": "https://images.unsplash.com/photo-1582397936337-1c1ddf48ed87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb21mb3J0aW5nJTIwaGFuZHxlbnwwfHx8fDE3NjM5MTI4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "comforting hand"
    },
    {
      "id": "account-avatar",
      "description": "Default avatar for user accounts.",
      "imageUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjM4NDAwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "person portrait"
    },
    {
      "id": "pyramid-logo",
      "description": "The logo for Pyramid Group Funerals.",
      "imageUrl": logoUrl,
      "imageHint": "company logo"
    },
    {
      "id": "pyramid-logo-square",
      "description": "The square logo for Pyramid Group Funerals.",
      "imageUrl": logoSquareUrl,
      "imageHint": "company logo"
    },
    {
      "id": "pyramid-nameplate",
      "description": "The nameplate logo for Pyramid Group Funerals.",
      "imageUrl": nameplateUrl,
      "imageHint": "company logo"
    }
  ]

    