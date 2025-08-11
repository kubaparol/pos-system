import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { cn } from '@/utils';

import { Button } from '../ui/button';
import { Input, type InputProps } from '../ui/input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        ref={ref}
        {...rest}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-500" aria-hidden="true" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
