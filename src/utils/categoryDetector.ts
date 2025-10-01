interface CategoryKeywords {
  categoryName: string;
  keywords: string[];
}

const categoryKeywordMap: CategoryKeywords[] = [
  {
    categoryName: 'Professional Achievements',
    keywords: ['project', 'completed', 'delivered', 'launched', 'shipped', 'achievement', 'goal', 'target', 'milestone', 'success', 'win', 'accomplished'],
  },
  {
    categoryName: 'Recognition & Feedback',
    keywords: ['award', 'recognition', 'praise', 'feedback', 'thank', 'appreciated', 'commended', 'acknowledged', 'congratulations', 'kudos', 'testimonial'],
  },
  {
    categoryName: 'Learning & Development',
    keywords: ['learned', 'training', 'course', 'certification', 'skill', 'workshop', 'seminar', 'development', 'education', 'study', 'practice', 'improvement'],
  },
  {
    categoryName: 'Career Milestones',
    keywords: ['promotion', 'hired', 'joined', 'transition', 'milestone', 'anniversary', 'raise', 'bonus', 'new role', 'position', 'title change'],
  },
  {
    categoryName: 'Leadership',
    keywords: ['led', 'managed', 'mentored', 'coached', 'supervised', 'directed', 'guided', 'team', 'leadership', 'delegate', 'coordinate'],
  },
  {
    categoryName: 'Innovation',
    keywords: ['innovate', 'created', 'invented', 'designed', 'solution', 'idea', 'prototype', 'experiment', 'creative', 'new approach', 'breakthrough'],
  },
  {
    categoryName: 'Collaboration',
    keywords: ['collaborated', 'partnership', 'teamwork', 'cooperation', 'worked with', 'joint', 'together', 'cross-functional', 'coordinated'],
  },
  {
    categoryName: 'Problem Solving',
    keywords: ['solved', 'resolved', 'fixed', 'debugged', 'troubleshoot', 'issue', 'problem', 'challenge', 'obstacle', 'solution'],
  },
  {
    categoryName: 'Performance',
    keywords: ['exceeded', 'surpassed', 'outperformed', 'improved', 'increased', 'boosted', 'optimized', 'enhanced', 'efficiency', 'productivity', 'metrics', 'kpi'],
  },
];

export function detectCategory(title: string, description: string): string | null {
  const combinedText = `${title} ${description}`.toLowerCase();

  let bestMatch: { categoryName: string; score: number } | null = null;

  for (const category of categoryKeywordMap) {
    let score = 0;
    for (const keyword of category.keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = combinedText.match(regex);
      if (matches) {
        score += matches.length;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { categoryName: category.categoryName, score };
    }
  }

  return bestMatch ? bestMatch.categoryName : null;
}

export async function findOrCreateCategory(
  userId: string,
  categoryName: string,
  supabase: any
): Promise<string | null> {
  const { data: existingCategory } = await supabase
    .from('categories')
    .select('id')
    .eq('user_id', userId)
    .eq('name', categoryName)
    .maybeSingle();

  if (existingCategory) {
    return existingCategory.id;
  }

  const categoryColors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e',
  ];

  const randomColor = categoryColors[Math.floor(Math.random() * categoryColors.length)];

  const { data: newCategory, error } = await supabase
    .from('categories')
    .insert({
      user_id: userId,
      name: categoryName,
      color: randomColor,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating category:', error);
    return null;
  }

  return newCategory.id;
}
