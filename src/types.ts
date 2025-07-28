export interface CarAttributes {
  make: string;
  model: string;
}

export interface ServiceAttributes {
  name: string;
}

export interface IncludedItem {
  id: string;
  type: 'car' | 'service';
  attributes: CarAttributes | ServiceAttributes;
}

export interface BookingRelationshipRef {
  id: string;
  type: string;
}

export interface BookingRelationships {
  car?: { data: BookingRelationshipRef | null };
  service?: { data: BookingRelationshipRef | null };
}

export interface RawBooking {
  id: string;
  attributes: {
    date: string;
    status: string;
  };
  relationships: BookingRelationships;
}

export interface EnrichedBooking {
  id: string;
  attributes: {
    date: string;
    status: string;
    car?: CarAttributes;
    service?: ServiceAttributes;
  };
}
