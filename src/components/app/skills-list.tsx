import { Badge } from '@/components/ui/badge';

interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge key={index} variant="secondary" className="px-3 py-1">
          {skill}
        </Badge>
      ))}
    </div>
  );
}