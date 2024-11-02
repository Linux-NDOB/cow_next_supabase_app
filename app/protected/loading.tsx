import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
    <h2 className="text-black font-black text-4xl">Cargando pagina...</h2>
      <LoaderCircle
        className={cn('my-28 h-16 w-16 text-primary/60 animate-spin', className)}
      />

    </div>
  );
};

export default Loader;
