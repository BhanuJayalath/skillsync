import { X } from "lucide-react"
import styles from "../assets/styles/service-modal.module.css"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  icon: string
}

const ServiceModal = ({ isOpen, onClose, title, description, icon }: ServiceModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalIconTitle}>
            <div className={styles.modalIcon}>
              <img src={icon || "/placeholder.svg"} alt={title} width={40} height={40} />
            </div>
            <h3>{title}</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>{description}</p>
        </div>
        <div className={styles.modalFooter}>
          <a href="/login">
          <button className="btn btn-dark">Get Started</button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal

