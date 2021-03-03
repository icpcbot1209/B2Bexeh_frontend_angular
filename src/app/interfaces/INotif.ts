export interface INotif {
  id: string;
  action_type: string;
  action_text: string;
  action_payload: any;
  timestamp: number;
  is_read: boolean;
}

export const ACTION_TYPES = {
  offer_created: 'offer_created',
  offer_accepted: 'offer_accepted',
  offer_declined: 'offer_declined',
  offer_terms_changed: 'offer_terms_changed',
  offer_paid: 'offer_paid',
  offer_shipped: 'offer_shipped',
};
