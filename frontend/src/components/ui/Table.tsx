import React from 'react';
import { clsx } from 'clsx';

export const TableContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
  <div className={clsx("w-full overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-sm", className)} {...props}>
    <table className="w-full text-left text-sm text-slate-700 border-collapse">
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <thead className={clsx("bg-slate-50/80 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 select-none", className)} {...props}>
    {children}
  </thead>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, children, ...props }) => (
  <tr className={clsx("border-b border-slate-100 hover:bg-slate-50/70 transition-colors duration-150 group", className)} {...props}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <th className={clsx("px-4 py-3 font-semibold text-slate-600", className)} {...props}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <td className={clsx("px-4 py-3 align-middle text-slate-800", className)} {...props}>
    {children}
  </td>
);
