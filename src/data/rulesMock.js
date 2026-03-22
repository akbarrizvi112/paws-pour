export const rulesMock = [
    { id: 1, name: 'No Chocolate', category: 'Toxic Ingredients', status: 'Active' },
    { id: 2, name: 'Limit High Fat for Seniors', category: 'Dietary Restrictions', status: 'Active' },
    { id: 3, name: 'Grain-Free Only', category: 'Allergy Filters', status: 'Inactive' },
    { id: 4, name: 'Puppy Portion Control', category: 'Portion Adjustments', status: 'Active' },
];

export const safetyLogsMock = [
    { id: 1, pet: 'Luna', species: 'Cat', ingredient: 'Chicken', date: '02 Mar' },
    { id: 2, pet: 'Max', species: 'Dog', ingredient: 'Chocolate', date: '01 Mar' },
    { id: 3, pet: 'Bella', species: 'Dog', ingredient: 'Beef', date: '28 Feb' },
    { id: 4, pet: 'Charlie', species: 'Cat', ingredient: 'Dairy', date: '27 Feb' },
];

export const activityChartData = [
    { name: 'Mon', allergyBlocks: 12, toxicBlocks: 0, portionAdjustments: 4 },
    { name: 'Tue', allergyBlocks: 11, toxicBlocks: 1, portionAdjustments: 5 },
    { name: 'Wed', allergyBlocks: 8, toxicBlocks: 0, portionAdjustments: 3 },
    { name: 'Thu', allergyBlocks: 17, toxicBlocks: 6, portionAdjustments: 8 },
    { name: 'Fri', allergyBlocks: 10, toxicBlocks: 2, portionAdjustments: 4 },
    { name: 'Sat', allergyBlocks: 9, toxicBlocks: 1, portionAdjustments: 4 },
    { name: 'Sun', allergyBlocks: 11, toxicBlocks: 0, portionAdjustments: 5 },
];
