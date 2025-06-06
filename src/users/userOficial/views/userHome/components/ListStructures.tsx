import { Structure } from '@/models/Structure.models';
import { FC, use } from 'react';
import { Link } from 'react-router-dom';

interface PropsList {
  getStructures: Promise<Structure[]>
}

const ListStructures: FC<PropsList> = ({ getStructures }) => {
  const structures = use(getStructures)

  return (
    <>
      {
        structures.map((structure) => (
          <Link key={structure.id_structure} to={`/structure/${structure.id_structure}`} className="bg-primary-color/90 hover:bg-primary-color/80 h-40  rounded-lg border-gray-700 hover:border-gray-600 transition-colors cursor-pointer shadow-gray-300 shadow-xl">
            <li className=" p-8">
              <h3 className="text-white  font-medium mb-2 text-2xl">{structure.name}</h3>
              <p className="text-gray-400 text-sm lowercase">{structure.name}</p>
            </li>
          </Link>
        ))
      }
    </>
  );
}

export default ListStructures;
