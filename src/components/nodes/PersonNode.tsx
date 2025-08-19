import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PersonData {
  name: string;
  role: string;
  department: string;
  level: 'ceo' | 'manager' | 'employee';
  avatar?: string;
}

export const PersonNode = memo(({ data, selected }: NodeProps) => {
  const personData = data as unknown as PersonData;
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getNodeStyle = () => {
    switch (personData.level) {
      case 'ceo':
        return 'org-node-ceo';
      case 'manager':
        return 'org-node-manager';
      default:
        return 'org-node-employee';
    }
  };

  const getBadgeVariant = () => {
    switch (personData.level) {
      case 'ceo':
        return 'default';
      case 'manager':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div
      className={cn(
        'org-node relative p-4 rounded-xl min-w-[200px] transition-all duration-300',
        getNodeStyle(),
        selected && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
        'hover:scale-105 cursor-pointer'
      )}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 border-2 border-background bg-primary"
      />

      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-background/20">
          <AvatarImage src={personData.avatar} alt={personData.name} />
          <AvatarFallback className="bg-background/20 text-current font-semibold">
            {getInitials(personData.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm truncate">{personData.name}</h3>
          <p className="text-xs opacity-90 truncate">{personData.role}</p>
          <Badge 
            variant={getBadgeVariant()}
            className="mt-1 text-xs"
          >
            {personData.department}
          </Badge>
        </div>
      </div>

      {/* Level indicator */}
      <div className="absolute -top-2 -right-2">
        <div
          className={cn(
            'w-6 h-6 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold',
            personData.level === 'ceo' && 'bg-primary text-primary-foreground',
            personData.level === 'manager' && 'bg-accent text-accent-foreground',
            personData.level === 'employee' && 'bg-muted text-muted-foreground'
          )}
        >
          {personData.level === 'ceo' ? 'C' : personData.level === 'manager' ? 'M' : 'E'}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 border-2 border-background bg-primary"
      />
    </div>
  );
});

PersonNode.displayName = 'PersonNode';