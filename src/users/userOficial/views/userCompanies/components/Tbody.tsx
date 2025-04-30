import { Company } from "@/models/Company.models";
import PopoverDelete from "@/shared/components/PopoverDelete";
import { Checkbox } from "antd";
import ModalEditCompany from "./ModalEditCompany";
import { useCompanyContext } from "@/context/CompanyContext";

interface TbodyProps {
  companies: Company[] | undefined
  selectedCompanies: number[]
  handleSelect: (id: number) => void
}

export default function Tbody({ companies, selectedCompanies, handleSelect }: TbodyProps) {
  const { fetchCompanies, remove } = useCompanyContext()
  const handleDeleteCompany = async (id:number) =>{
    await remove([id])
    fetchCompanies()
  }

  return (
    <tbody className="bg-white">
      {companies && companies.map((company) => (
        <tr
          key={company.id_company}
          className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${selectedCompanies.includes(company.id_company) ? "bg-blue-50" : ""
            }`}
        >
          <td className="p-3">
            <Checkbox
              checked={selectedCompanies.includes(company.id_company)}
              onChange={() => handleSelect(company.id_company)}
            />
          </td>
          <td className="p-4 font-medium">{company.id_company}</td>
          <td className="p-4 ">{company.activity}</td>
          <td className="p-4">
            <div className="flex justify-end gap-2">
              <ModalEditCompany company={company}/>
              <PopoverDelete title="company" handleDelete={() => handleDeleteCompany(company.id_company)}></PopoverDelete>
            </div>
          </td>
        </tr>
      ))}
      {companies === undefined && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No companies found matching your search criteria.
          </td>
        </tr>
      )}
      {companies?.length === 0 && (
        <tr>
          <td colSpan={8} className="p-8 text-center text-gray-500">
            No companies found matching your search criteria.
          </td>
        </tr>
      )}
    </tbody>
  )
}