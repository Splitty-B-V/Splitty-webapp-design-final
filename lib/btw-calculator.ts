/**
 * BTW (VAT) Calculator for Dutch Restaurants
 * 
 * In Nederland geldt in restaurants:
 * - 9% BTW voor eten en niet-alcoholische dranken die ter plaatse geconsumeerd worden
 *   (maaltijden, koffie, thee, frisdranken, sappen)
 * - 21% BTW voor alcoholische dranken (bier, wijn, cocktails)
 * - 21% BTW voor diensten zoals catering en evenementen
 */

export type ItemCategory = 'food' | 'non_alcoholic' | 'alcoholic' | 'service';

export interface BTWRates {
  low: number;
  high: number;
}

export const BTW_RATES: BTWRates = {
  low: 9,    // Food and non-alcoholic beverages
  high: 21   // Alcoholic beverages and services
};

export function getBTWRate(category: ItemCategory): number {
  switch (category) {
    case 'food':
    case 'non_alcoholic':
      return BTW_RATES.low;
    case 'alcoholic':
    case 'service':
      return BTW_RATES.high;
    default:
      return BTW_RATES.low;
  }
}

export function calculateBTW(amountIncludingBTW: number, btwRate: number): number {
  // BTW is included in the price, so we calculate backwards
  // Formula: BTW = amountIncludingBTW - (amountIncludingBTW / (1 + btwRate/100))
  return amountIncludingBTW - (amountIncludingBTW / (1 + btwRate / 100));
}

export function calculateAmountExcludingBTW(amountIncludingBTW: number, btwRate: number): number {
  return amountIncludingBTW / (1 + btwRate / 100);
}

export interface OrderItemWithBTW {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: ItemCategory;
  btwRate: number;
  btwAmount: number;
  priceExcludingBTW: number;
}

export function categorizeMenuItem(itemName: string): ItemCategory {
  const lowerName = itemName.toLowerCase();
  
  // Alcoholic beverages
  const alcoholicKeywords = ['beer', 'bier', 'wine', 'wijn', 'cocktail', 'whiskey', 'vodka', 
    'gin', 'rum', 'tequila', 'champagne', 'prosecco', 'spirits', 'alcohol'];
  
  // Non-alcoholic beverages
  const nonAlcoholicKeywords = ['coffee', 'koffie', 'thee', 'tea', 'cola', 'fanta', 'sprite',
    'juice', 'sap', 'water', 'milk', 'melk', 'frisdrank', 'soda', 'lemonade'];
  
  if (alcoholicKeywords.some(keyword => lowerName.includes(keyword))) {
    return 'alcoholic';
  }
  
  if (nonAlcoholicKeywords.some(keyword => lowerName.includes(keyword))) {
    return 'non_alcoholic';
  }
  
  // Default to food
  return 'food';
}

export function processOrderItems(items: Array<{
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}>): OrderItemWithBTW[] {
  return items.map(item => {
    const category = categorizeMenuItem(item.name);
    const btwRate = getBTWRate(category);
    const btwAmount = calculateBTW(item.totalPrice, btwRate);
    const priceExcludingBTW = calculateAmountExcludingBTW(item.totalPrice, btwRate);
    
    return {
      ...item,
      category,
      btwRate,
      btwAmount,
      priceExcludingBTW
    };
  });
}

export function calculateTotalBTW(items: OrderItemWithBTW[]): {
  totalBTW: number;
  btwBreakdown: Record<number, number>;
} {
  const btwBreakdown: Record<number, number> = {};
  let totalBTW = 0;
  
  items.forEach(item => {
    if (!btwBreakdown[item.btwRate]) {
      btwBreakdown[item.btwRate] = 0;
    }
    btwBreakdown[item.btwRate] += item.btwAmount;
    totalBTW += item.btwAmount;
  });
  
  return { totalBTW, btwBreakdown };
}